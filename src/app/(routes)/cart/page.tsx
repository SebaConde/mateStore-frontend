/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../../../../hooks/use-cart"
import { formatPrice } from "../../../lib/formatPice"
import CartItem from "../../../../src/app/(routes)/cart/components/cart-item"

interface CustomerData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  street: string;
  city: string;
  department: string;
  country: string;
}

export default function Page() {
  const { items, removeAll } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerData>({
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerPhone: "",
    street: "",
    city: "",
    department: "",
    country: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const prices = items.map(product => product.price)
  const totalPrice = prices.reduce((total, price) => total + price, 0)

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const buildFullAddress = () => {
    const { street, city, department, country } = customerData
    const parts = [street, city, department, country].filter(part => part.trim() !== '')
    return parts.join(', ')
  }

  const handleCheckout = async () => {
    // Validar que todos los campos estén completos
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'street', 'city', 'department', 'country']
    const missingFields = requiredFields.filter(field => !customerData[field as keyof CustomerData])
    
    if (missingFields.length > 0) {
      alert("Por favor completá todos los campos requeridos.")
      return
    }
    setIsLoading(true)
    try {
      // Construir la dirección completa
      const fullAddress = buildFullAddress()

      console.log('Sending data to backend:', {
        customerName: customerData.customerName,
        customerEmail: customerData.customerEmail,
        customerAddress: fullAddress,
        customerPhone: customerData.customerPhone,
        products: items.map((item) => ({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id
        }))
      })

      const response = await axios.post("http://localhost:1337/api/order/create-preference", {
        customerName: customerData.customerName,
        customerEmail: customerData.customerEmail,
        customerAddress: fullAddress,
        customerPhone: customerData.customerPhone,
        products: items.map((item) => ({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id
        })),
      },{
        headers: {
          "Content-Type": "application/json",
        },
        
      }
    )
      console.log("Response de create-preference:", response.data)
      window.location.href = response.data.init_point;
      const preferenceId = response.data.id
      // Limpiar el carrito después de crear la preferencia
      removeAll()
      // Redirigir a MercadoPago
      window.location.href = `https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=${preferenceId}`
    } catch (error: any) {
      console.error("Error al crear la preferencia de pago", error)
      
      // Mostrar el error específico del backend si está disponible
      if (error.response?.data?.error?.message) {
        alert(`Error: ${error.response.data.error.message}`)
      } else if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert("Hubo un problema al procesar el pago. Por favor intentá nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[80vh]">
      <h1 className="mb-5 text-3xl font-bold">Shopping cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-lg font-semibold">Resumen de pedido</p>
            <Separator />
            <div className="flex flex-col gap-5 my-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between w-full">
                  <p>{item.productName}</p>
                  <p>{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p className="font-bold">Precio total</p>
              <p className="font-bold">{formatPrice(totalPrice)}</p>
            </div>
            
            {!showForm ? (
              <div className="flex items-center justify-center w-full mt-3">
                <Button 
                  className="w-full" 
                  onClick={() => setShowForm(true)}
                  disabled={items.length === 0}
                >
                  Comprar
                </Button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Datos de envío</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Nombre completo *</label>
                    <input
                      type="text"
                      value={customerData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Email *</label>
                    <input
                      type="email"
                      value={customerData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Dirección *</label>
                    <input
                      type="text"
                      value={customerData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Ciudad *</label>
                      <input
                        type="text"
                        value={customerData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ciudad"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Departamento *</label>
                      <input
                        type="text"
                        value={customerData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Depto"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">País *</label>
                      <input
                        type="text"
                        value={customerData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="País"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Teléfono *</label>
                    <input
                      type="tel"
                      value={customerData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Procesando..." : "Confirmar compra"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
