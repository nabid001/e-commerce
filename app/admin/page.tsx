import DashboardCard from "@/app/admin/_components/DashboardCard";
import { getSalesData } from "@/db/actions/order.action";
import { getProductData } from "@/db/actions/product.action";
import { getUserData } from "@/db/actions/user.action";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

const Admin = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData?.numberOfSales ?? 0)} Orders`}
        body={formatCurrency(salesData?.amount ?? 0)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(userData?.averageValuePerUser ?? 0)} Average Value`}
        body={formatNumber(userData?.userCount ?? 0)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData?.inactiveCount ?? 0)} Inactive`}
        body={formatNumber(productData?.activeCount ?? 0)}
      />
    </div>
  );
};

export default Admin;
