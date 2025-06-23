import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { FaFileAlt } from 'react-icons/fa';
import { subIconMapper } from '../../components/layout/Navbar/Navbar';
import AuthContext from '../../context/authContext/AuthContext'; // Import AuthContext

const MostUsedURLs = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navMenu = [] } = useContext(AuthContext); // Get navMenu from AuthContext

  useEffect(() => {
    const fetchData = async () => {
      const storedUsage = localStorage.getItem('submenuUsage');
      if (storedUsage) {
        const parsedUsage = JSON.parse(storedUsage);
        const sortedSubmenus = Object.entries(parsedUsage)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 8) // Limit to top 4 most used URLs
          .map(([subMenuUrl, data]) => ({
            url: subMenuUrl,
            name: data.name,
            iconName: data.iconName,
          }))
          .filter((item) =>
            navMenu.some((menu) =>
              menu?.menu?.submenus?.some((sub) => sub?.subMenuUrl === item.url),
            ),
          ); // Filter unauthorized URLs
        setUrls(sortedSubmenus);
      }
      setLoading(false);
    };

    setTimeout(fetchData, 1000); // Show skeleton for 1 second
  }, [navMenu]); // Add navMenu as a dependency

  return (
    <div className="my-2 bg-white shadow-md rounded-lg border border-gray-200 h-52 overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center mb-4 bg-white rounded-t-xl shadow-md sticky top-0 z-10 p-2">
        <h2 className="text-lg font-semibold text-gray-800">Most Used URLs</h2>
        <TrendingUp className="w-6 h-6 text-gradient-to-r from-blue-500 to-purple-500" />
      </div>
      <div className="grid grid-cols-2 gap-1 p-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-sm animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                <div className="flex flex-col space-y-2">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-40 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          : urls.map((item, index) => (
              <NavLink
                key={index}
                to={item.url}
                className="flex items-center space-x-3 p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded-md shadow-sm">
                <div className="w-6 h-6 p-2 flex items-center justify-center rounded-md text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500">
                  {subIconMapper[item.iconName] || <FaFileAlt />}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xs font-medium text-gray-700">
                    {item.name}
                  </h3>
                  {/* <p className="text-xs text-gray-500 truncate w-40">
                    {item.url}
                  </p> */}
                </div>
              </NavLink>
            ))}
      </div>
    </div>
  );
};

export default MostUsedURLs;
