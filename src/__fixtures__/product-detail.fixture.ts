import type { Product } from "../types"

export const productDetailFixture: Product = {
  "id":"APL-I15PM",
  "brand":"Apple",
  "name":"iPhone 15 Pro Max",
  "description":"El Apple iPhone 15 Pro Max es un smartphone de gama alta con una pantalla Super Retina XDR de 6.7 pulgadas, chip A17 Bionic, y un avanzado sistema de cámara con capacidades de IA.",
  "basePrice":1319,
  "rating":4.5,
  "specs":{
    "screen":"6.7\" Super Retina XDR",
    "resolution":"2796 x 1290 pixels",
    "processor":"A17 Bionic",
    "mainCamera":"Sistema de cámaras Pro de 48 MP",
    "selfieCamera":"12 MP TrueDepth",
    "battery":"No especificada",
    "os":"iOS",
    "screenRefreshRate":"120 Hz"
  },
  "colorOptions":[
    {
      "name":"Titanio Negro",
      "hexCode":"#2C2C2C",
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-negro.webp"
    },
    {
      "name":"Titanio Blanco",
      "hexCode":"#F0F0F0",
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-blanco.webp"
    },
    {
      "name":"Titanio Natural",
      "hexCode":"#DBCEC3",
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-natural.webp"
    },
    {
      "name":"Titanio Azul",
      "hexCode":"#3A4A5A",
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-azul.webp"
    }
  ],
  "storageOptions":[
    {
      "capacity":"256 GB",
      "price":1319
    },
    {
      "capacity":"512 GB",
      "price":1449
    },
    {
      "capacity":"1 TB",
      "price":1699
    }
  ],
  "similarProducts":[
    {
      "id":"GPX-8A",
      "brand":"Google",
      "name":"Pixel 8a",
      "basePrice":459,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp"
    },
    {
      "id":"SMG-S23FE",
      "brand":"Samsung",
      "name":"Galaxy S23 FE",
      "basePrice":699,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S23FE-purple.webp"
    },
    {
      "id":"RLM-NOTE50",
      "brand":"realme",
      "name":"Note 50",
      "basePrice":99,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/RLM-NOTE50-midnight-black.webp"
    },
    {
      "id":"MTE-EDGE50PRO",
      "brand":"Motorola",
      "name":"edge 50 Pro",
      "basePrice":649,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTE-EDGE50PRO-negro.webp"
    },
    {
      "id":"XMI-14",
      "brand":"Xiaomi",
      "name":"14",
      "basePrice":899,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-14-negro.webp"
    },
    {
      "id":"SMG-A15",
      "brand":"Samsung",
      "name":"Galaxy A15 LTE",
      "basePrice":159,
      "imageUrl":"http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A15-azul.webp"
    }
  ]
}
