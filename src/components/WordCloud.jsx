import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import { useParams } from "react-router-dom";
import { apiClient } from "../services/supabase";
import { getWordCloudData } from "../services/utils";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export default function WordCloud() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const results = await apiClient.getAnswers(id);
      if (results.data) {
        const wordCloudData = getWordCloudData(
          results.data.map((d) => d.answer_text)
        );
        setData(wordCloudData);
      }
    }
    getData().catch((err) => {
      console.error(err);
    });
  }, [id]);

  return (
    <div className="card">
      <ReactWordcloud words={data} options={{ rotations: 0 }} />
    </div>
  );
}
