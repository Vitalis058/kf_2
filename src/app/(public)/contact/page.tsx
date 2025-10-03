export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Get in touch with our team for support, inquiries, or partnership
            opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+971 2 401 0000</p>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">info@khalifafund.ae</p>
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">
                    Abu Dhabi, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sunday - Thursday</span>
                  <span className="text-muted-foreground">
                    8:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
