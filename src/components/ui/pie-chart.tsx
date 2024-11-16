"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tenant } from "@/data/tenants"

const chartConfig = {
  adimplentes: {
    label: "Adimplentes",
    color: "hsl(var(--chart-2))",
  },
  inadimplentes: {
    label: "Inadimplentes",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function CustomPieChart({ title, data, tenants, damage, income }: { title?: string, data: { label: string, percentage: number, fill: string }[], tenants?: Tenant[], damage: number, income: number }) {

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {tenants?.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Inadimplentes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ul className="list-disc">
          {tenants?.map((tenant) => (
            <li key={tenant.cpf}>
              {`${tenant.name} - ${tenant.delinquencyTime} meses de atraso - Saldo Devedor R$${tenant.rentAmount * tenant.delinquencyTime}`}
            </li>
          ))}
          <li>
            {`Entrada atual: R$ ${income}`}
          </li>
          <li>
            {`Prejuízo: R$ ${damage}`}
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}
