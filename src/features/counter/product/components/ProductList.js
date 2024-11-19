import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../../app/constants";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "beauty", label: "beauty", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "furniture", label: "furniture", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      { value: "home-decoration", label: "home decoration", checked: false },
      {
        value: "kitchen-accessories",
        label: "kitchen accessories",
        checked: false,
      },
      { value: "laptops", label: "laptops", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      {
        value: "mobile-accessories",
        label: "mobile accessories",
        checked: false,
      },
      { value: "motorcycle", label: "motorcycle", checked: false },
      { value: "skin-care", label: "skin care", checked: false },
      { value: "smartphones", label: "smartphones", checked: false },
      {
        value: "sports-accessories",
        label: "sports accessories",
        checked: false,
      },
      { value: "sunglasses", label: "sunglasses", checked: false },
      { value: "tablets", label: "tablets", checked: false },
      { value: "tops", label: "tops", checked: false },
      { value: "vehicle", label: "vehicle", checked: false },
      { value: "womens-bags", label: "womens bags", checked: false },
      { value: "womens-dresses", label: "womens dresses", checked: false },
      { value: "womens-jewellery", label: "womens jewellery", checked: false },
      { value: "womens-shoes", label: "womens shoes", checked: false },
      { value: "womens-watches", label: "womens watches", checked: false },
    ],
  },

  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Essence", label: "Essence", checked: false },
      { value: "Glamour Beauty", label: "Glamour Beauty", checked: false },
      { value: "Velvet Touch", label: "Velvet Touch", checked: false },
      { value: "Chic Cosmetics", label: "Chic Cosmetics", checked: false },
      { value: "Nail Couture", label: "Nail Couture", checked: false },
      { value: "Calvin Klein", label: "Calvin Klein", checked: false },
      { value: "Chanel", label: "Chanel", checked: false },
      { value: "Dior", label: "Dior", checked: false },
      { value: "Dolce & Gabbana", label: "Dolce & Gabbana", checked: false },
      { value: "Gucci", label: "Gucci", checked: false },
      { value: "Annibale Colombo", label: "Annibale Colombo", checked: false },
      { value: "Furniture Co.", label: "Furniture Co.", checked: false },
      { value: "Knoll", label: "Knoll", checked: false },
      { value: "Bath Trends", label: "Bath Trends", checked: false },
      { value: "Apple", label: "Apple", checked: false },
      { value: "Asus", label: "Asus", checked: false },
      { value: "Huawei", label: "Huawei", checked: false },
      { value: "Lenovo", label: "Lenovo", checked: false },
      { value: "Dell", label: "Dell", checked: false },
      { value: "Fashion Trends", label: "Fashion Trends", checked: false },
      { value: "Gigabyte", label: "Gigabyte", checked: false },
      { value: "Classic Wear", label: "Classic Wear", checked: false },
      { value: "Casual Comfort", label: "Casual Comfort", checked: false },
      { value: "Urban Chic", label: "Urban Chic", checked: false },
      { value: "Nike", label: "Nike", checked: false },
      { value: "Puma", label: "Puma", checked: false },
      { value: "Off White", label: "Off White", checked: false },
      {
        value: "Fashion Timepieces",
        label: "Fashion Timepieces",
        checked: false,
      },
      { value: "Longines", label: "Longines", checked: false },
      { value: "Rolex", label: "Rolex", checked: false },
      { value: "Amazon", label: "Amazon", checked: false },
      { value: "Beats", label: "Beats", checked: false },
      { value: "TechGear", label: "TechGear", checked: false },
      { value: "GadgetMaster", label: "GadgetMaster", checked: false },
      { value: "SnapTech", label: "SnapTech", checked: false },
      { value: "ProVision", label: "ProVision", checked: false },
      { value: "Generic Motors", label: "Generic Motors", checked: false },
      { value: "Kawasaki", label: "Kawasaki", checked: false },
      { value: "MotoGP", label: "MotoGP", checked: false },
      { value: "ScootMaster", label: "ScootMaster", checked: false },
      { value: "SpeedMaster", label: "SpeedMaster", checked: false },
      { value: "Attitude", label: "Attitude", checked: false },
      { value: "Olay", label: "Olay", checked: false },
      { value: "Vaseline", label: "Vaseline", checked: false },
      { value: "Oppo", label: "Oppo", checked: false },
      { value: "Realme", label: "Realme", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
      { value: "Vivo", label: "Vivo", checked: false },
      { value: "Fashion Shades", label: "Fashion Shades", checked: false },
      { value: "Fashion Fun", label: "Fashion Fun", checked: false },
      { value: "Chrysler", label: "Chrysler", checked: false },
      { value: "Dodge", label: "Dodge", checked: false },
      { value: "Fashionista", label: "Fashionista", checked: false },
      { value: "Heshe", label: "Heshe", checked: false },
      { value: "Prada", label: "Prada", checked: false },
      {
        value: "Elegance Collection",
        label: "Elegance Collection",
        checked: false,
      },
      { value: "Comfort Trends", label: "Comfort Trends", checked: false },
      { value: "Fashion Diva", label: "Fashion Diva", checked: false },
      { value: "Pampi", label: "Pampi", checked: false },
      { value: "Fashion Express", label: "Fashion Express", checked: false },
      { value: "IWC", label: "IWC", checked: false },
      { value: "Fashion Gold", label: "Fashion Gold", checked: false },
      { value: "Fashion Co.", label: "Fashion Co.", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    // TODO: on server it will support multiple category
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (e, page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  return (
    <div>
      <div className="bg-white">
        <div>
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 mt-2 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center ">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter handleFilter={handleFilter}> </DesktopFilter>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* This is our product list  */}
                  <div className="bg-white">
                    <div className="mx-auto max-w-3xl px-4 py-16  sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Products
                      </h2>
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product) => (
                          <Link to="/product-detail">
                            <div
                              key={product.id}
                              className="group relative border-solid border-2 p-2 border-gray-200"
                            >
                              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                <img
                                  alt={product.title}
                                  src={product.thumbnail}
                                  className="size-full object-cover object-center lg:size-full"
                                />
                              </div>

                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <div href={product.thumbnail}>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {product.title}
                                    </div>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    <StarIcon className="w-6 h-6 inline"></StarIcon>
                                    <span className="align-bottom">
                                      {product.rating}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-400">
                                    $
                                    {Math.round(
                                      product.price *
                                        (1 - product.discountPercentage / 100)
                                    )}
                                  </p>
                                  <p className="text-sm font-medium line-through text-gray-900">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {/* *************** */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

// *********************************************************************************************************

function MobileFilter({
  handleFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  return (
    <>
      {/* MobileFilter*/}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            onChange={(e) => handleFilter(e, section, option)}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

// ***********************************************************************************************************
function DesktopFilter({ handleFilter }) {
  return (
    <>
      {/* Filters */}
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            key={section.id}
            as="div"
            className="border-b border-gray-200 py-6"
          >
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="size-5 [.group:not([data-open])_&]:hidden"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      defaultValue={option.value}
                      defaultChecked={option.checked}
                      onChange={(e) => handleFilter(e, section, option)}
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      type="checkbox"
                      className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>
    </>
  );
}

// ***************************************************************************

function Pagination({ page, setPage, handlePage, totalItems = 55 }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
                <div
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${index + 1 === page ? ' bg-indigo-600 text-white' : 'text-gray-700'}  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              )
            )}
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
