import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/services/api";
import { Tenant } from "@/data/tenants";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TenantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tenantData, setTenantData] = useState<Tenant>({
    name: "",
    cpf: "",
    kitnetSize: "pequeno",
    isDelinquent: true,
    delinquencyTime: 0,
    rentAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setTenantData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        ...tenantData,
        delinquencyTime: Number(tenantData.delinquencyTime),
      };
    try {
        if (id) {
          await api.put(`/tenants/${id}`, formData);
          toast.success("Inquilino atualizado com sucesso!");
        } else {
          await api.post("/tenants", tenantData);
          toast.success("Inquilino criado com sucesso!");
        }
        navigate("/dashboard");
      } catch (error) {
        toast.error("Erro ao salvar os dados do inquilino.");
      }
  };

  useEffect(() => {
    if (id) {
      const fetchTenant = async () => {
        try {
          const response = await api.get(`/tenants/${id}`);
          setTenantData(response.data);
        } catch (error) {
          toast.error("Erro ao carregar os dados do inquilino.");
        }
      };
      fetchTenant();
    }
  }, [id]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-start mb-6">
      <a onClick={()=> navigate('/dashboard')} className="mr-5"><ArrowLeft /></a>
      <h2 className="text-xl font-bold">Criar Inquilino</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            value={tenantData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            value={tenantData.cpf}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tamanho do Kitnet</label>
          <select
            name="kitnetSize"
            value={tenantData.kitnetSize}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          >
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status de Inadimplência</label>
          <input
            type="checkbox"
            name="isDelinquent"
            checked={tenantData.isDelinquent}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
          
        </div>

        {tenantData.isDelinquent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tempo de Inadimplência (meses)</label>
            <input
              type="number"
              name="delinquencyTime"
              value={tenantData.delinquencyTime}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valor do Aluguel</label>
          <input
            type="number"
            name="rentAmount"
            value={tenantData.rentAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <Button type="submit" className="w-full text-white py-2 rounded-md">
          Criar Inquilino
        </Button>
      </form>
    </div>
  );
};

export default TenantForm;
