/**
 * Pure function for mapping feature IDs to their corresponding images
 */
export const getFeatureImage = (featureId: string, customImage?: string): string => {
  // If feature has a custom image, use that
  if (customImage) {
    return customImage;
  }
  
  // Otherwise use the default mapping
  switch (featureId) {
    case 'luci':
      return "/lovable-uploads/e6632418-100a-4695-b616-b643ef13304c.png";
    case 'tapparelle':
      return "/lovable-uploads/fe24b59f-57ea-4463-a1da-970fbfe1242c.png";
    case 'tende':
      return "/lovable-uploads/c0a1f152-d988-470c-ace9-54e6b6cd8f71.png";
    case 'clima':
      return "/lovable-uploads/c995d44b-5a6b-49b1-8300-513cbd07f544.png";
    case 'audio':
      return "/lovable-uploads/d191ced0-069a-4f4c-8410-909ab7e51011.png";
    case 'videocitofono':
      return "/lovable-uploads/f5e5fded-c7de-4125-a941-5f1b7848216b.png";
    case 'sicurezza':
      return "/lovable-uploads/9d845369-d0e2-4422-a530-568c6698397b.png";
    case 'supervisor':
      return "/lovable-uploads/cce32257-443f-4688-901b-cd6e4dc8cb1d.png";
    case 'prese':
      return "/lovable-uploads/d56be5f7-57a6-4791-b896-09863446c8b8.png";
    default:
      return "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop";
  }
};
