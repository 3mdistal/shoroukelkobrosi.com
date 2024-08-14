"use client";

import { useState } from "react";

interface AboutContentToggleProps {
  personalIntro: React.ReactNode;
  professionalIntro: React.ReactNode;
  personalPhoto: React.ReactNode;
  professionalPhoto: React.ReactNode;
  professionalLogos: React.ReactNode;
}

export default function AboutContentToggle({
  personalIntro,
  professionalIntro,
  personalPhoto,
  professionalPhoto,
  professionalLogos,
}: AboutContentToggleProps): React.ReactElement {
  const [isPersonal, setIsPersonal] = useState(true);

  const toggleContent = (): void => {
    setIsPersonal(!isPersonal);
  };

  return (
    <>
      <button type="button" onClick={toggleContent}>
        Toggle Content
      </button>
      <div>
        {isPersonal ? personalPhoto : professionalPhoto}
        <div>
          {isPersonal ? personalIntro : professionalIntro}
          {isPersonal ? null : professionalLogos}
        </div>
      </div>
    </>
  );
}
