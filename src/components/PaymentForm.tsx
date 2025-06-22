
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PaymentFormProps {
  jobTier: 'basic' | 'featured' | 'premium';
  onPaymentSuccess: () => void;
}

const tierPricing = {
  basic: { price: 0, features: ['Standard listing', '30 days active'] },
  featured: { price: 10, features: ['Featured listing', 'Higher visibility', '45 days active'] },
  premium: { price: 25, features: ['Premium placement', 'Top of search results', '60 days active', 'Company logo highlight'] }
};

export function PaymentForm({ jobTier, onPaymentSuccess }: PaymentFormProps) {
  const [processing, setProcessing] = useState(false);
  const tier = tierPricing[jobTier];

  const handlePayment = async () => {
    if (jobTier === 'basic') {
      onPaymentSuccess();
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: tier.price * 100, // Convert to cents
          tier: jobTier,
          currency: 'usd'
        }
      });

      if (error) throw error;

      // In a real implementation, you would redirect to Stripe Checkout
      // For now, we'll simulate a successful payment
      toast.success(`Payment of $${tier.price} processed successfully!`);
      onPaymentSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {jobTier.charAt(0).toUpperCase() + jobTier.slice(1)} Posting
          <Badge variant={jobTier === 'premium' ? 'default' : 'secondary'}>
            ${tier.price}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button 
          onClick={handlePayment} 
          disabled={processing}
          className="w-full"
        >
          {processing ? 'Processing...' : 
           jobTier === 'basic' ? 'Post Job (Free)' : `Pay $${tier.price}`}
        </Button>
      </CardContent>
    </Card>
  );
}
