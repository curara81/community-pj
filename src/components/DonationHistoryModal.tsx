
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface DonationHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Donation {
  id: string;
  amount: number;
  donation_type: string;
  payment_method: string;
  status: string;
  created_at: string;
}

const DonationHistoryModal = ({ open, onOpenChange }: DonationHistoryModalProps) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      fetchDonations();
    }
  }, [open, user]);

  const fetchDonations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "기부내역 조회 실패",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setDonations(data || []);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString() + '원';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getDonationTypeText = (type: string) => {
    return type === 'regular' ? '정기후원' : '일시후원';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '처리중';
      case 'failed': return '실패';
      default: return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            기부내역 조회
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">기부내역을 불러오는 중...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">아직 기부 내역이 없습니다.</p>
            </div>
          ) : (
            donations.map((donation) => (
              <Card key={donation.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {formatAmount(donation.amount)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getDonationTypeText(donation.donation_type)} · {donation.payment_method}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(donation.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        donation.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusText(donation.status)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationHistoryModal;
