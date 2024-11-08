// components/Materials/Materials.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMaterials } from '../../services/api/materialsApi';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await fetchMaterials();
        setMaterials(data);
      } catch (error) {
        console.error('Не вдалося завантажити матеріали:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  if (loading) {
    return <p>Завантаження матеріалів...</p>;
  }

  return (
    <div className="materials container mt-5">
      <h2 className="mb-4">Матеріали</h2>
      {materials.length === 0 ? (
        <p>Матеріалів не знайдено.</p>
      ) : (
        <div className="row">
          {materials.map((material) => (
            <div key={material.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{material.title}</h5>
                  <p className="card-text">{material.description}</p>
                  <Link to={`/materials/${material.id}`} className="btn btn-primary">
                    Детальніше
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Materials;
