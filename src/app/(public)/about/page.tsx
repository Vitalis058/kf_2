export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            About Khalifa Fund
          </h1>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-muted-foreground text-center mb-12">
              Supporting UAE entrepreneurs and SMEs with comprehensive funding,
              training, and business development services since 2007.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To foster entrepreneurship and support the growth of small and
                  medium enterprises in the UAE through innovative funding
                  solutions and comprehensive business support services.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading catalyst for entrepreneurial success in the
                  UAE, empowering businesses to thrive and contribute to the
                  nation&apos;s economic diversification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
