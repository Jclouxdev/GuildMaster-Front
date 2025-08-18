import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: '🗓️',
      title: 'Planning et Raids',
      description: 'Organisez vos raids WoW avec un système de planification avancé. Créez, éditez et gérez vos événements avec facilité.',
      link: '/raids',
      linkText: 'Voir les raids'
    },
    {
      icon: '👥',
      title: 'Roster et Composition',
      description: 'Gérez votre roster de guilde, visualisez les rôles et créez des compositions équilibrées pour vos raids.',
      link: '/roster',
      linkText: 'Gérer le roster'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description: 'Recevez des notifications en temps réel pour les inscriptions, modifications de raids et événements importants.',
      link: '/notifications',
      linkText: 'Notifications'
    },
    {
      icon: '⚙️',
      title: 'Administration',
      description: 'Outils d\'administration pour les Guild Masters et Officiers. Gérez les permissions et paramètres de guilde.',
      link: '/admin',
      linkText: 'Administration'
    }
  ];

  const stats = [
    { label: 'Guildes actives', value: '2,500+' },
    { label: 'Raids organisés', value: '45,000+' },
    { label: 'Joueurs connectés', value: '15,000+' },
    { label: 'Événements créés', value: '120,000+' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">Gérez votre guilde</span>
              <span className="block text-blue-300">World of Warcraft</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              La plateforme ultime pour organiser vos raids, gérer vos membres et faire prospérer votre guilde WoW.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/raids"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Découvrir les fonctionnalités
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer efficacement votre guilde World of Warcraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  {feature.linkText}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WoW Integration Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Optimisé pour World of Warcraft
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Toutes les classes et spécialisations WoW</h4>
                    <p className="text-gray-300">Support complet des 13 classes et leurs spécialisations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Instances et difficultés actuelles</h4>
                    <p className="text-gray-300">Aberrus, Vault of the Incarnates, Amirdrassil et plus encore.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Gestion des rôles Tank/Heal/DPS</h4>
                    <p className="text-gray-300">Créez des compositions équilibrées automatiquement.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Prochaines fonctionnalités</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Intégration API WoW (Battle.net)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Import automatique des personnages</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Statistiques de performance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Bot Discord intégré</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à faire passer votre guilde au niveau supérieur ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de Guild Masters qui utilisent déjà GuildMaster pour organiser leurs raids.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Créer votre compte gratuitement
            </Link>
            <Link
              href="/raids"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Voir une démo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
