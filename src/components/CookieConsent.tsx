import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Cookie-Hinweis</h3>
          </div>
          <p className="text-base-content/80 mb-6">
            Wir verwenden Cookies, um die Nutzererfahrung zu verbessern.
            Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={decline}>
              Ablehnen
            </Button>
            <Button onClick={accept}>
              Akzeptieren
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
