"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, StarIcon, UsersIcon, ShieldIcon, ZapIcon, CloudIcon, PenToolIcon, TagIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <PenToolIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">NotesApp</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Reviews
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Multi-Tenant • Secure • Collaborative
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Streamline Your Team's <span className="text-primary">Collaboration</span> with Smart Notes
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Organize, share, and collaborate on notes with your team. Built for businesses that value security,
              simplicity, and seamless collaboration across all devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8">
                  Try for Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                See Pricing
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Free tier includes 3 notes</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to stay organized</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for teams and individuals who demand the best note-taking experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <UsersIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multi-Tenant Architecture</CardTitle>
                <CardDescription>
                  Complete data isolation between organizations with role-based access control.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <ShieldIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  JWT-based authentication with secure data encryption and compliance-ready infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CloudIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Cloud Synchronization</CardTitle>
                <CardDescription>
                  Access your notes from anywhere with real-time sync across all your devices.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <TagIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Organization</CardTitle>
                <CardDescription>
                  Organize notes with tags, categories, and powerful search to find what you need instantly.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <ZapIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Built with modern technology for instant loading and seamless user experience.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <UsersIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Share notes with team members and collaborate in real-time with proper permissions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that's right for your team</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-border">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold">$0</div>
                <CardDescription>Perfect for individuals getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Up to 3 notes</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Basic organization</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Mobile & web access</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Basic security</span>
                </div>
                <Link href="/login" className="block pt-4">
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold">
                  $9<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For teams and power users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Unlimited notes</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Advanced organization</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Team collaboration</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-primary mr-3" />
                  <span>Advanced security</span>
                </div>
                <Link href="/login" className="block pt-4">
                  <Button className="w-full">Start Pro Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by teams worldwide</h2>
            <p className="text-xl text-muted-foreground">See what our customers have to say about NotesApp</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "NotesApp has transformed how our team collaborates. The multi-tenant architecture gives us the
                  security we need while keeping everything organized."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">JS</span>
                  </div>
                  <div>
                    <div className="font-semibold">John Smith</div>
                    <div className="text-sm text-muted-foreground">CTO, Acme Corp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The simplicity and power of NotesApp is unmatched. We've tried many solutions, but this one just
                  works perfectly for our workflow."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">AD</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alice Davis</div>
                    <div className="text-sm text-muted-foreground">Product Manager, Beta Inc</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a notes app that understands enterprise needs. The role-based access and security features
                  are exactly what we were looking for."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">IT Director, TechStart</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to transform your note-taking?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams who trust NotesApp for their collaboration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8">
                  Start Free Today
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <PenToolIcon className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold">NotesApp</span>
              </div>
              <p className="text-muted-foreground">
                The modern way to organize and collaborate on notes for teams and individuals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 NotesApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
