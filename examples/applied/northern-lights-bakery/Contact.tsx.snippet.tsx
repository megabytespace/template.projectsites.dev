/**
 * Applied output — src/pages/Contact.tsx for Northern Lights Bakery.
 */
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useSEO } from '@/hooks/useSEO';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';

export default function Contact() {
  useSEO({
    title: 'Contact — Northern Lights Bakery',
    description: 'Get in touch with Northern Lights Bakery. 1234 4th Avenue, Anchorage. Open Tue–Sun 6am–3pm. Call (907) 555-0100.',
  });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Northern Lights Bakery',
        }}
      />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent text-sm font-mono tracking-widest uppercase">
              Get in touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mt-4 mb-6">
              <span className="gradient-text">We answer in 24 hours</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Custom cake order, catering inquiry, or just a question — we read every email.
              For same-day orders, please call.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection animation="animate-slideInLeft">
              <form className="glass rounded-2xl p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-text/80 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      autoComplete="name"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors min-h-[44px]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-text/80 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors min-h-[44px]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text/80 text-sm font-medium mb-2">Subject</label>
                  <select
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors min-h-[44px]"
                  >
                    <option>Custom cake order</option>
                    <option>Catering inquiry</option>
                    <option>Wholesale / café partnership</option>
                    <option>Press / media</option>
                    <option>General question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text/80 text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder-text-subtle focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors resize-none min-h-[44px]"
                    placeholder="Date, occasion, size, flavor preference, dietary notes…"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
                <p className="text-text-subtle text-xs leading-relaxed">
                  Cake orders need 5 business days notice (10 for wedding cakes). Catering needs 48 hours.
                  For same-day questions, call (907) 555-0100 — we answer Tue–Sun 6am–3pm.
                </p>
              </form>
            </AnimatedSection>

            <AnimatedSection animation="animate-slideInRight">
              <div className="space-y-6">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1234+4th+Ave+Anchorage+AK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 flex items-start gap-4 underline-hover interactive-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-text font-medium mb-1">Visit</h3>
                    <p className="text-text-muted text-sm">1234 4th Avenue, Anchorage, AK 99501</p>
                  </div>
                </a>

                <a
                  href="tel:+19075550100"
                  className="glass rounded-2xl p-6 flex items-start gap-4 underline-hover interactive-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-text font-medium mb-1">Call</h3>
                    <p className="text-text-muted text-sm">(907) 555-0100</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@northernlightsbakery.example"
                  className="glass rounded-2xl p-6 flex items-start gap-4 underline-hover interactive-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <h3 className="text-text font-medium mb-1">Email</h3>
                    <p className="text-text-muted text-sm">hello@northernlightsbakery.example</p>
                  </div>
                </a>

                <div className="glass rounded-2xl p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-text font-medium mb-1">Hours</h3>
                    <dl className="text-text-muted text-sm space-y-0.5">
                      <div className="flex justify-between gap-6">
                        <dt>Tue–Fri</dt><dd>6am–3pm</dd>
                      </div>
                      <div className="flex justify-between gap-6">
                        <dt>Sat–Sun</dt><dd>6am–3pm</dd>
                      </div>
                      <div className="flex justify-between gap-6 text-text-subtle">
                        <dt>Mon</dt><dd>Closed</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
