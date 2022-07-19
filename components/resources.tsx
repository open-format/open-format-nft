import React from "react";
import StyledLink from "./styled-link";

interface Props {
  resources: Resource[];
}

export default function Resources({ resources }: Props) {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Resources
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Here are some links to help you get started.
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-3xl">
        {resources.map((resource) => (
          <StyledLink key={resource.title} href={resource.category.href}>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={resource.imageUrl}
                  alt={resource.alt}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">
                    {resource.category.name}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {resource.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {resource.description}
                  </p>
                </div>
              </div>
            </div>
          </StyledLink>
        ))}
      </div>
    </div>
  );
}
