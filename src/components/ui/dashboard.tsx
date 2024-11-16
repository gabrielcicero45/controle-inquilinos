import { DataTable } from "@/components/ui/data-table"
import { columns, Tenant } from "@/data/tenants.tsx"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { CustomPieChart } from "@/components/ui/pie-chart.tsx";
import { useAuth } from '@/contexts/AuthContext';
import { fetchDelinquencyReport, fetchTenants } from "@/services/api";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [delinquencyReport, setDelinquencyReport] = useState<{ tenants: Tenant[], delinquencyPercentage: number, income: number, damage: number }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleDelinquencyReport = async () => {
    
    const delinquentTenants = await fetchDelinquencyReport();
    setDelinquencyReport(delinquentTenants);
  };
  
  useEffect(() => {
    const loadTenants = async () => {
      try {
        const data = await fetchTenants();
        setTenants(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar inquilinos.");
        setLoading(false);
      }
    };

    loadTenants();
  }, []);


  return (<div className="container mx-auto py-10">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Button onClick={()=> {logout(); navigate("/login")}}>Deslogar</Button>
    <h1 className="text-2xl text-center">Controle de Inquilinos</h1>
    <Button onClick={handleDelinquencyReport}>Ver Relatório de Inadimplência</Button>
    <Button onClick={()=> navigate("/tenant/new")} className="mx-4">Adicionar Inquilino</Button>
    {delinquencyReport && (
      <>
      <CustomPieChart title={"Relatório de Inadimplência"} tenants={delinquencyReport.tenants} data={[{ label: "Inadimplentes", percentage: delinquencyReport.delinquencyPercentage, fill: "var(--color-inadimplentes)" }, { label: "Adimplentes", percentage: 100 - delinquencyReport.delinquencyPercentage, fill: "var(--color-adimplentes)" },]} />
      <CustomPieChart title={"Receita X Prejuizo"} tenants={delinquencyReport.tenants} data={[{ label: "Prejuizo", percentage: delinquencyReport.damage, fill: "var(--color-inadimplentes)" }, { label: "Receita", percentage: delinquencyReport.income, fill: "var(--color-adimplentes)" },]} />
      </>
    )}
    <DataTable columns={columns} data={tenants} />
  </div>);
}

export default Dashboard;