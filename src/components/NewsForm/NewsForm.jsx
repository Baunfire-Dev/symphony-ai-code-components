import "./NewsForm.css"
import { useEffect, useState } from "react";

export const NewsForm = ({ industry: defaultIndustry }) => {
  const [industry, setIndustry] = useState(
    defaultIndustry === "Choose an industry" ? "" : defaultIndustry
  );

  const formId = {
    "Retail / CPG": "9d3bc7c8-ca76-43f3-831a-56f94a8e086f",
    "Financial Services": "a16f039a-2c27-416a-ad43-30dfc790c9f0",
    "Industrial": "7d27750a-2709-4e7a-bcaa-0087fab76335",
    "Media": "c057f711-4dd7-4959-8bd6-38f09074be6c",
    "Enterprise IT": "39292cc8-bbd0-4782-8cc8-380d3479e74d",
  };

  const portalId = {
    "Retail / CPG": "4544242",
    "Financial Services": "22739080",
    "Industrial": "2910746",
    "Media": "8682958",
    "Enterprise IT": "21750060",
  };

  useEffect(() => {
    const container = document.querySelector("#news-form-container");
    if (!container) return;
    
    if (!industry || industry === "Choose an industry") {
      container.innerHTML = "";
      return;
    }

    if (!formId[industry]) return;

    const createForm = () => {
      container.innerHTML = "";

      window.hbspt.forms.create({
        region: "na1",
        portalId: portalId[industry],
        formId: formId[industry],
        target: "#news-form-container",
      });
    };

    if (window.hbspt) {
      createForm();
    } else {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.onload = createForm;
      document.body.appendChild(script);
    }
  }, [industry]);

  return (
    <div>
      <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="industry-select">
        <option value="">Choose an industry</option>
        <option value="Retail / CPG">Retail / CPG</option>
        <option value="Financial Services">Financial Services</option>
        <option value="Industrial">Industrial</option>
        <option value="Media">Media</option>
        <option value="Enterprise IT">Enterprise IT</option>
      </select>
    </div>
  );
};