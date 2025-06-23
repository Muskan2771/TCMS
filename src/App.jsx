import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/globalFont.css';
import { GlobalAlert } from './components/index';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import CacheBuster from 'react-cache-buster';
import packageFile from '../package.json';
import PrivateRoute from './routing/PrivateRoute';
import Loader from './components/common/loader/Loader';
import NotAuthorized from './components/ui/NotAuthorized';
import AuthContext from './context/authContext/AuthContext';
import UserContext from './context/userContext/UserContext';
import disableConsoleLogs from './utils/disableConsoleLogs';
import { useRole } from './context/roleContext/RoleContextProvider';
import UnderDev from './components/ui/UnderDev';
import checkInternetConnection from '../internetCheck';
import NoInternet from './components/ui/NoInternet';
import { useDashboard } from './context/dashboardContext/DashboardContextProvider';
import CourseDetails from './pages/user-setting/CourseDetails';
import TestDetails from './pages/user-setting/TestDetails';
import MyCourses from './pages/learningModule/myCourses';
import CourseDetail from './pages/learningModule/CourseDetail';
import TestTaking from './pages/learningModule/TestTaking';
import TestResults from './pages/learningModule/TestResults';
// import ProposalTable from "./pages/proposal/view-proposal/ProposalTable";

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  disableConsoleLogs();
}

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Login = lazy(() => import('./pages/login/Login'));
const Layout = lazy(() => import('./Layout'));
const NewUserActivationScreen = lazy(
  () => import('./pages/user-setting/NewUserActivationScreen'),
);
const ResetPassword = lazy(() => import('./pages/user-setting/ResetPassword'));
const ManageUsers = lazy(() => import('./pages/user-setting/ManageUsers'));

const AccessPrivilegeView = lazy(
  () => import('./pages/setting/access-privilege/AccessPrivilegeView'),
);
const ManageAccess = lazy(
  () => import('./pages/setting/access-privilege/ManageAccess'),
);

function App() {
  const { version } = packageFile;
  const isProduction = process.env.NODE_ENV === 'production';
  const { isLoading: authLoading } = useContext(AuthContext);
  const { isLoading: userLoading } = useContext(UserContext);
  const { isLoading: roleLoading } = useRole();
  const { isLoading: NotesLoading } = useDashboard();

  const isLoading = authLoading || userLoading || roleLoading || NotesLoading;

  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    checkInternetConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const parseUrlAndNavigate = () => {
      const currentUrl = new URL(window.location.href);
      const route = currentUrl.searchParams.get('route');
      const token = currentUrl.searchParams.get('token');
      if (route && token) {
        switch (route) {
          case 'user-activation':
            navigate(`/user-activation/${token}`);
            break;
          case 'reset-password':
            navigate(`/reset-password/${token}`);
            break;
          default:
            // Optionally handle unknown routes
            break;
        }
      }
    };

    parseUrlAndNavigate();
  }, [navigate]);

  if (!isOnline) {
    return <NoInternet />;
  }

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} // If false, the library is disabled.
      isVerboseMode={false} // If true, the library writes verbose logs to console.
      loadingComponent={<Loader />} // If not passed, nothing appears at the time of new version check.
    >
      <div className="">
        <GlobalAlert />
      </div>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/user-activation/:token"
          element={
            <Suspense fallback={<Loader />}>
              <NewUserActivationScreen />
            </Suspense>
          }
        />
        <Route
          path="/not-authorized"
          element={
            <Suspense fallback={<Loader />}>
              <NotAuthorized />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Layout />
              </Suspense>
            </PrivateRoute>
          }>
          <Route
            index
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="invite-user"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ManageUsers />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="manageuser"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ManageUsers />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="user-access"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <AccessPrivilegeView />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="user-access/access/:role/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ManageAccess />
                </Suspense>
              </PrivateRoute>
            }
          />
           <Route
            path="create-course"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <CourseDetails />
                </Suspense>
              </PrivateRoute>
            }
          />
           <Route
            path="my-courses"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <MyCourses />
                </Suspense>
              </PrivateRoute>
            }
          />
        
          <Route path="*" element={<UnderDev />} />
        </Route>
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Layout />
              </Suspense>
            // </PrivateRoute>
          }>


        <Route
            path="create-test"
            element={
              // <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <TestDetails />
                </Suspense>
              // </PrivateRoute>
            }
          />
            <Route
            path="course/:courseId"
            element={
              // <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <CourseDetail />
                </Suspense>
              // </PrivateRoute>
            }
          />
          <Route
            path="test/:testId"
            element={
              // <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <TestTaking />
                </Suspense>
              // </PrivateRoute>
            }
          />
        </Route>
        <Route path="/test-results/:testAttemptId" element={<TestResults />} />
      </Routes>
    </CacheBuster>
  );
}

export default App;
