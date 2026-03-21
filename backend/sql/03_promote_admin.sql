-- Super Admin pour compte principal
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'wankamdypuedilane@gmail.com';

-- Note: pewipif734@paylaar.com reste 'student' normal

-- Note: Une fois super_admin, vous pourrez nommer d'autres admins 
-- directement depuis l'interface "Utilisateurs" du Dashboard Admin.
