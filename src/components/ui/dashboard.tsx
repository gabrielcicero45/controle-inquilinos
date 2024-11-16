import { DataTable } from "@/components/ui/data-table"
import { columns, Tenant } from "@/data/tenants.tsx"
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { CustomPieChart } from "@/components/ui/pie-chart.tsx";
import { useAuth } from '@/contexts/AuthContext';
import { fetchDelinquencyReport, fetchTenants, getCurrentUser } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";



function Dashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [delinquencyReport, setDelinquencyReport] = useState<{ tenants: Tenant[], delinquencyPercentage: number, income: number, damage: number }>();
  const [showDelinquencyReport, setShowDelinquencyReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const token = localStorage.getItem("token");

  const handleDelinquencyReport = async () => {
    if (showDelinquencyReport) return setShowDelinquencyReport(false);
    const delinquentTenants = await fetchDelinquencyReport();
    setDelinquencyReport(delinquentTenants);
    setShowDelinquencyReport(true)
  };

  useMemo(async () => {
    const currentUser = await getCurrentUser(token);
    setCurrentUser(currentUser);
  }, []);

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
  }, [tenants]);


  return (<div className="container mx-auto py-10">
    {currentUser ? (<div className="flex items-center my-4 justify-end">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
      </Avatar>
      <p className="mx-4">{currentUser?.name}</p>
      <a onClick={() => { logout(); navigate("/login") }}><LogOut /></a>
    </div>) : <p>Carregando dados...</p>}


    <h1 className="text-2xl text-center">Controle de Inquilinos</h1>
    <Button onClick={handleDelinquencyReport}>{showDelinquencyReport ? 'Ocultar Relatório de Inadimplência' : 'Ver Relatório de Inadimplência'}</Button>
    <Button onClick={() => navigate("/tenant/new")} className="mx-4">Adicionar Inquilino</Button>
    {showDelinquencyReport && (
      <CustomPieChart
        title={"Relatório de Inadimplência"}
        tenants={delinquencyReport?.tenants}
        data={[
          { label: "Inadimplentes", percentage: delinquencyReport?.delinquencyPercentage || 0, fill: "var(--color-inadimplentes)" },
          { label: "Adimplentes", percentage: 100 - (delinquencyReport?.delinquencyPercentage || 0), fill: "var(--color-adimplentes)" },]}
        damage={delinquencyReport?.damage || 0}
        income={delinquencyReport?.income || 0}
      />
    )}
    <DataTable columns={columns} data={tenants} />
  </div>);
}

export default Dashboard;