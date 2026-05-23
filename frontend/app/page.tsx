"use client";

import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import {
  ShieldCheck,
  Database,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const COLORS = [
  "#64dfdf",
  "#48bfe3",
  "#80ffdb",
  "#5390d9",
];

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState<any>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    async function loadData() {

      try {

        const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
);
        const data = await response.json();

        setDashboardData(data);

      } catch (error) {

        console.log(error);

      }
    }

    loadData();

  }, []);

  async function exportarPDF() {

  if (!dashboardRef.current) return;

  try {

    const dataUrl = await toPng(
      dashboardRef.current,
      {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#071c39",
      }
    );

   const pdf = new jsPDF({
  orientation: "landscape",
  unit: "px",
  format: [1600, 1000],
});

const imgProps =
  pdf.getImageProperties(dataUrl);

const pageWidth =
  pdf.internal.pageSize.getWidth();

const pageHeight =
  pdf.internal.pageSize.getHeight();

  

const ratio = Math.min(
  pageWidth / imgProps.width,
  pageHeight / imgProps.height
);

const imgWidth =
  imgProps.width * ratio;

const imgHeight =
  imgProps.height * ratio;

const x = 0;

const y =
  (pageHeight - imgHeight) / 2;

pdf.addImage(
  dataUrl,
  "PNG",
  x,
  y,
  imgWidth,
  imgHeight
);

pdf.save("jornada_do_cliente.pdf");

  } catch (error) {

    console.log(error);

    alert("Erro ao exportar PDF.");

  }
}

  if (!dashboardData) {

    return (
      <main className="min-h-screen bg-[#071c39] flex items-center justify-center text-white text-2xl">
        Carregando dashboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#071c39] text-white px-3 xl:px-6 py-4">

      <div
  ref={dashboardRef}
  className="w-full"
>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">

          <div>

            <h1 className="text-3xl xl:text-4xl font-bold text-[#64dfdf] leading-none">
              Painel Analítico da Jornada do Cliente
            </h1>

           <p className="text-zinc-300 text-sm mt-1">
  Painel analítico dinâmico conectado a pipeline de tratamento de dados em Python,
  processado no Google Colab e disponibilizado via API REST para monitoramento
  de governança, qualidade e satisfação do cliente.
</p>

          </div>

          <div className="flex items-center gap-3">

  <div className="bg-[#64dfdf] text-[#071c39] px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
    Trusted Layer
  </div>

  <button
  onClick={exportarPDF}
    className="
      bg-white/10
      border
      border-[#64dfdf]
      hover:bg-[#64dfdf]
      hover:text-[#071c39]
      transition-all
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
      shadow-lg
      cursor: pointer;
    "
  >
    Exportar PDF
  </button>

</div>

        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">

          {/* KPI 1 */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4 shadow-md">

            <div className="flex items-center gap-4">

              <div className="bg-[#0b3d68] p-3 rounded-xl">
                <Database
                  size={28}
                  className="text-[#64dfdf]"
                />
              </div>

              <div>

                <p className="text-zinc-300 text-sm">
                  Registros
                </p>

                <h2 className="text-3xl font-bold text-[#64dfdf]">
                  {dashboardData.total_registros.toLocaleString()}
                </h2>

              </div>

            </div>

          </div>

          {/* KPI 2 */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4 shadow-md">

            <div className="flex items-center gap-4">

              <div className="bg-[#0b3d68] p-3 rounded-xl">
                <ShieldCheck
                  size={28}
                  className="text-[#64dfdf]"
                />
              </div>

              <div>

                <p className="text-zinc-300 text-sm">
                  Score Qualidade
                </p>

                <h2 className="text-3xl font-bold text-[#64dfdf]">
                  {dashboardData.score_qualidade}%
                </h2>

              </div>

            </div>

          </div>

          {/* KPI 3 */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4 shadow-md">

            <div className="flex items-center gap-4">

              <div className="bg-[#0b3d68] p-3 rounded-xl">
                <AlertTriangle
                  size={28}
                  className="text-[#64dfdf]"
                />
              </div>

              <div>

                <p className="text-zinc-300 text-sm">
                  Inconsistências
                </p>

                <h2 className="text-3xl font-bold text-[#64dfdf]">
                  {dashboardData.inconsistencias.toLocaleString()}
                </h2>

              </div>

            </div>

          </div>

          {/* KPI 4 */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4 shadow-md">

            <div className="flex items-center gap-4">

              <div className="bg-[#0b3d68] p-3 rounded-xl">
                <Clock3
                  size={28}
                  className="text-[#64dfdf]"
                />
              </div>

              <div>

                <p className="text-zinc-300 text-sm">
                  SLA Entrega
                </p>

                <h2 className="text-3xl font-bold text-[#64dfdf]">
                  {dashboardData.tempo_medio_entrega}d
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* TITLE */}
        <div className="bg-gradient-to-r from-[#4dd0e1] to-[#64dfdf] text-[#071c39] rounded-xl py-2 text-center font-bold tracking-widest text-sm mb-4 shadow-lg">
          INDICADORES DE GOVERNANÇA
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">

          {/* STATUS */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <h2 className="text-lg font-semibold mb-3">
              Status dos Pedidos
            </h2>

            <ResponsiveContainer width="100%" height={240}>

              <BarChart data={dashboardData.status_pedidos}>

                <XAxis
                  dataKey="name"
                  stroke="#fff"
                  tick={{ fontSize: 10 }}
                />

                <YAxis
                  stroke="#fff"
                  tick={{ fontSize: 10 }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#64dfdf"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PAGAMENTOS */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <h2 className="text-lg font-semibold mb-3">
              Tipos de Pagamento
            </h2>

            <ResponsiveContainer width="100%" height={240}>

              <PieChart>

                <Pie
                data={dashboardData.pagamentos.filter(
                  (item: any) => item.value > 10
                )}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >

                  {dashboardData.pagamentos.map(
                    (_: any, index: number) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* CUSTOMER + SERVICE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">

          {/* CUSTOMER REVIEW */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <h2 className="text-lg font-semibold mb-4">
              Customer Review Analytics
            </h2>

            <div className="grid grid-cols-4 gap-3 items-end">

              <div className="text-center">
                <div className="bg-[#64dfdf] h-[80px] rounded-t-xl"></div>

                <p className="text-xs mt-2">
                  Score 1
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#64dfdf] h-[55px] rounded-t-xl"></div>

                <p className="text-xs mt-2">
                  Score 2
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#64dfdf] h-[45px] rounded-t-xl"></div>

                <p className="text-xs mt-2">
                  Score 3
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#64dfdf] h-[120px] rounded-t-xl"></div>

                <p className="text-xs mt-2">
                  Score 4/5
                </p>
              </div>

            </div>

            <div className="mt-5 bg-[#08203d] rounded-xl p-4 flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-300">
                  Média de Avaliação
                </p>

                <h3 className="text-3xl font-bold text-[#64dfdf]">
                  3.84
                </h3>

              </div>

              <div className="text-right">

                <p className="text-sm text-zinc-300">
                  Total Avaliações
                </p>

                <h3 className="text-2xl font-bold">
                  {dashboardData.total_registros.toLocaleString()}
                </h3>

              </div>

            </div>

          </div>

          {/* SERVICE LEVEL */}
          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <h2 className="text-lg font-semibold mb-3">
              Service Level
            </h2>

            <div className="flex flex-col items-center justify-center">

              {/* GAUGE */}
              <div className="relative w-[280px] h-[150px]">

                {/* ARCO */}
                <div className="absolute bottom-0 w-full h-[140px] rounded-t-full bg-gradient-to-r from-green-500 via-yellow-400 to-orange-500 overflow-hidden">

                  {/* CENTRO */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-[90px] bg-[#0d2c52] rounded-t-full"></div>

                </div>

                {/* PONTEIRO */}
                <div
                  className="absolute bottom-0 left-1/2 origin-bottom transition-all duration-700"
                  style={{
                    transform: `translateX(-50%) rotate(${
                      dashboardData?.nps?.promotores > 70
                        ? "45deg"
                        : dashboardData?.nps?.promotores > 40
                        ? "0deg"
                        : "-45deg"
                    })`,
                  }}
                >

                  <div className="w-[4px] h-[95px] bg-white rounded-full"></div>

                  <div className="w-5 h-5 bg-white border-4 border-[#0d2c52] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"></div>

                </div>

              </div>

              {/* BADGE */}
              <div className="bg-[#08203d] px-5 py-2 rounded-xl mt-2 shadow-lg">

                <p className="text-sm">

                  Nível de Serviço:
                  <span className="ml-2 font-bold text-yellow-300">
                    {
                      dashboardData?.nps?.promotores > 70
                        ? "SATISFEITO"
                        : dashboardData?.nps?.promotores > 40
                        ? "MEDIANO"
                        : "INSATISFEITO"
                    }
                  </span>

                </p>

              </div>

              {/* LEGENDA */}
              <div className="flex flex-col gap-2 mt-4 w-full">

                <div className="flex items-center justify-between bg-[#08203d] rounded-lg px-4 py-2">

                  <div className="flex items-center gap-2">

                    <div className="w-4 h-4 rounded-full bg-green-500"></div>

                    <p className="text-sm">
                      Satisfeito
                    </p>

                  </div>

                  <span className="font-bold text-sm">
                    {dashboardData?.nps?.promotores}%
                  </span>

                </div>

                <div className="flex items-center justify-between bg-[#08203d] rounded-lg px-4 py-2">

                  <div className="flex items-center gap-2">

                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>

                    <p className="text-sm">
                      Mediano
                    </p>

                  </div>

                  <span className="font-bold text-sm">
                    {dashboardData?.nps?.neutros}%
                  </span>

                </div>

                <div className="flex items-center justify-between bg-[#08203d] rounded-lg px-4 py-2">

                  <div className="flex items-center gap-2">

                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>

                    <p className="text-sm">
                      Insatisfeito
                    </p>

                  </div>

                  <span className="font-bold text-sm">
                    {dashboardData?.nps?.detratores}%
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* GOVERNANÇA */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2
                className="text-[#64dfdf] mt-1"
                size={22}
              />

              <div>

                <h3 className="font-bold mb-1">
                  Completude
                </h3>

                <p className="text-sm text-zinc-300 leading-5">
                  Nenhum valor crítico ausente identificado.
                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2
                className="text-[#64dfdf] mt-1"
                size={22}
              />

              <div>

                <h3 className="font-bold mb-1">
                  Consistência
                </h3>

                <p className="text-sm text-zinc-300 leading-5">
                  Regras temporais validadas com sucesso.
                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2
                className="text-[#64dfdf] mt-1"
                size={22}
              />

              <div>

                <h3 className="font-bold mb-1">
                  Integridade
                </h3>

                <p className="text-sm text-zinc-300 leading-5">
                  Sem inconsistências estruturais detectadas.
                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#0d2c52] border border-[#1f6aa5] rounded-2xl p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2
                className="text-[#64dfdf] mt-1"
                size={22}
              />

              <div>

                <h3 className="font-bold mb-1">
                  Rastreabilidade
                </h3>

                <p className="text-sm text-zinc-300 leading-5">
                  Fluxo completo Raw → Processed → Trusted.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}