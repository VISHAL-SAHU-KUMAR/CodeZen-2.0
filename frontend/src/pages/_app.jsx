import '@/styles/globals.css'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import AgriEffects from '@/components/common/AgriEffects'
import { AuthProvider } from '@/context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AuthProvider>
      <Head>
        <title>AgriPredict360 - AI Powered Smart Farming</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50 relative overflow-x-hidden">
        <AgriEffects />
        <Navbar />
        <main className="flex-grow z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
