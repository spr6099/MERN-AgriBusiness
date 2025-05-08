import { useEffect, useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { url } from "../../../baseUrl";
import axios from "axios";

function Techdata() {
  const [tech, setTech] = useState([]);

  useEffect(() => {
    getTechData();
  }, []);

  const getTechData = async () => {
    try {
      const response = await axios.get(`${url}/allTechDatas`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTech(response.data.data);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="mb-4">
            <h2 className="text-center text-primary fw-bold">Information</h2>
          </div>

          {/* Grid Container for Tech Cards */}
          <div
            className="d-grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {tech.length > 0 ? (
              tech.map((item, index) => {
                const fileExtension = item.file?.split(".").pop().toLowerCase();

                return (
                  <div
                    key={index}
                    className="card shadow-lg border-0 rounded-4"
                    style={{ width: "20rem" }}
                  >
                    <div className="card-body d-flex flex-column align-items-center">
                      {/* Title */}
                      <h5 className="card-title text-primary fw-bold">
                        {item.name}
                      </h5>

                      {/* Media Container */}
                      <div
                        className=" overflow-hidden mb-3"
                        style={{
                          height: "180px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {fileExtension === "mp4" ? (
                          <video
                            src={`${url}/${item.file}`}
                            className="w-100 h-100"
                            controls
                            muted
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={`${url}/${item.file}`}
                            className="w-100 h-100"
                            alt="preview"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </div>

                      {/* Description */}
                      <p className="fw-semibold text-secondary">Description</p>
                      <div
                        className=" p-2 overflow-auto"
                        style={{
                          height: "150px",
                          width: "100%",
                          background: "#f8f9fa",
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Techdata;
