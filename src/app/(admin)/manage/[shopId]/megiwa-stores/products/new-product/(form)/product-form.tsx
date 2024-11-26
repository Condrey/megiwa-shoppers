"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { upsertProductSchema, UpsertProductSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import cuid from "cuid";
import { MoreHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import AdvancedSetting from "./advanced-setting";
import Categories from "./categories";
import CustomText from "./custom-text";
import { Form } from "./default-imports";
import HireAProfessional from "./hire-a-professional";
import ImagesAndVideos from "./images-and-videos";
import InventoryAndShipping from "./inventory-and-shipping";
import MarketingAndSeo from "./marketing-and-seo";
import PreOrder from "./pre-order";
import Pricing from "./pricing";
import ProductInfo from "./product-info";
import ProductOptions from "./product-options";
import Subscriptions from "./subscriptions";
import Visibilities from "./visibilities";

export default function ProductForm() {
  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      id: cuid(),
      name: "",
      ribbon: "",
      description: "",
      price: undefined,
      discount: {
        id: cuid(),
        type: "AMOUNT",
        value: 0,
      },
      salePrice: 0,
      pricePerUnitData: {
        baseMeasurementUnit: "G",
        baseQuality: undefined,
        totalMeasurementUnit: "G",
        totalQuantity: undefined,
      },
      costAndProfitData: {
        itemCost: 0,
        profit: undefined,
        profitMargin: undefined,
      },
    },
  });
  const watchedName = form.watch("name");

  return (
    <section className="size-full px-4 max-w-[80rem] mx-auto">
      <header className="flex z-20 sticky py-4 top-0 bg-sidebar-content-background h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {/* TODO: figure out this link  */}
                  <BreadcrumbLink href="">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <Separator orientation="vertical" />
                <BreadcrumbItem className="hidden md:block">
                  {!watchedName ? " Untitled product" : watchedName}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="gap-4  items-center flex">
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontalIcon />
            </Button>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </header>
      <Form {...form}>
        <form className="size-full  grid lg:grid-cols-3 gap-4 py-4 pt-0 *:flex-1">
          <div className="lg:col-span-2 w-full auto-cols-max   flex flex-col gap-8">
            <ImagesAndVideos form={form} />
            <ProductInfo form={form} />
            <Pricing form={form} />
            <CustomText form={form} />
            <ProductOptions form={form} />
            <InventoryAndShipping form={form} />
            <PreOrder form={form} />
            <Subscriptions form={form} />
          </div>
          <div className="lg:col-span-1 flex auto-cols-max  flex-col gap-8 w-full ">
            <Visibilities form={form} />
            <Categories form={form} />
            <MarketingAndSeo form={form} />
            <AdvancedSetting form={form} />
            <HireAProfessional />
          </div>
        </form>
      </Form>
    </section>
  );
}
