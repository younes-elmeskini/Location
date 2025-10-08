"use client";
import { motion } from "framer-motion";

interface SimpleMapProps {
  className?: string;
}

export default function SimpleMap({ className = "" }: SimpleMapProps) {
  return (
    <motion.div 
      className={`bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl overflow-hidden relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Carte simulée avec des éléments visuels */}
      <div className="relative w-full h-full min-h-[400px] p-8">
        {/* Titre de la carte */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md">
            <h4 className="font-semibold text-gray-800 text-sm">Casablanca, Maroc</h4>
          </div>
        </div>

        {/* Marqueur de localisation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Icône de localisation */}
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            
            {/* Animation de pulsation */}
            <motion.div
              className="absolute inset-0 bg-red-400 rounded-full opacity-30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Éléments décoratifs pour simuler une carte */}
        <div className="absolute top-16 left-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 rounded-lg px-3 py-2 shadow-sm"
          >
            <p className="text-xs text-gray-600">Boulevard Mohammed V</p>
          </motion.div>
        </div>

        <div className="absolute bottom-16 right-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/80 rounded-lg px-3 py-2 shadow-sm"
          >
            <p className="text-xs text-gray-600">Centre-ville</p>
          </motion.div>
        </div>

        <div className="absolute top-32 right-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="bg-white/80 rounded-lg px-3 py-2 shadow-sm"
          >
            <p className="text-xs text-gray-600">Aéroport</p>
          </motion.div>
        </div>

        {/* Lignes pour simuler des routes */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-20">
            <motion.path
              d="M 50 100 Q 200 50 350 150 Q 500 200 600 100"
              stroke="#4F46E5"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M 100 300 Q 300 250 500 350"
              stroke="#059669"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>

        {/* Bouton d'action */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Voir sur Google Maps
          </motion.button>
        </div>

        {/* Informations de localisation */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            viewport={{ once: true }}
            className="bg-white/90 rounded-lg px-3 py-2 shadow-md"
          >
            <div className="text-xs text-gray-600">
              <p>📍 33.5731° N, 7.5898° W</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
