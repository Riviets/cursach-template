// components/Materials/MaterialDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMaterialById } from '../../services/api/materialsApi';

function MaterialDetail() {
  const { materialId } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterial = async () => {
      try {
        const data = await fetchMaterialById(materialId);
        setMaterial(data);
      } catch (error) {
        console.error('Не вдалося завантажити деталі матеріалу:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterial();
  }, [materialId]);

  if (loading) {
    return <p>Завантаження деталей матеріалу...</p>;
  }

  if (!material) {
    return <p>Матеріал не знайдено.</p>;
  }

  return (
    <div className="material-detail container mt-5">
      <h2>{material.title}</h2>
      <p>{material.description}</p>

      {material.files && material.files.length > 0 && (
        <div className="mt-4">
          <h4>Файли:</h4>
          <ul className="list-group">
            {material.files.map((file) => (
              <li key={file.id} className="list-group-item d-flex justify-content-between align-items-center">
                {file.file_name}
                <a href={file.file_url} download className="btn btn-outline-primary btn-sm">
                  Завантажити
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MaterialDetail;
