import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Featured Tutors', href: '#tutors' },
        { name: 'Popular Subjects', href: '#subject1' },
        { name: 'Success Stories', href: '#success-stories' },
      ],
    },
    {    
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms', href: '/legal/terms' },
        { name: 'Privacy', href: '/legal/privacy' },
        { name: 'Cookies', href: '/legal/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div  className="-mt-[85px]">
            <div className="flex items-center mb-6 -ml-[30px]">
              <Image
              src="/images/logos/logo_blue.png"
              alt="Scholora Logo"
              width={200}
              height={320}
              className="rounded-lg invert brightness-0"
            />
            </div>
            <p className="text-gray-400 leading-relaxed -mt-[85px]">
              Connecting students across Morocco with expert tutors for academic excellence.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-6 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400 font-medium">
            © 2025 Scholora. All rights reserved. Made with ❤️ in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;