import React from 'react';

export default () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    AuthService.user()
    .then(res => {
      setUser(res);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="Profile">
      
    </div>
  );
}