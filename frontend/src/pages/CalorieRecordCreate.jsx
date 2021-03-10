import React from "react";
import CenterCard from "components/cards/CenterCard";
import CalorieRecordForm from "components/forms/CalorieRecordForm";

export default () => {
  return (
    <CenterCard title="Create Calorie Record">
      <CalorieRecordForm />
    </CenterCard>
  );
}