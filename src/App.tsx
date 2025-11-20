import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
