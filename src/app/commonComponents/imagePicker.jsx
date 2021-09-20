import PropTypes from 'prop-types';

import ImageUploader from 'react-images-upload';

export default function ImagePicker({
  onChange,
  withPreview,
  withIcon,
  maxFileSizeInBytes,
}) {
  return (
    <ImageUploader
      withIcon={withIcon}
      withPreview={withPreview}
      buttonText="Select Image"
      onChange={onChange}
      imgExtension={['.jpg', '.png']}
      maxFileSize={maxFileSizeInBytes}
      singleImage
      fileContainerStyle={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
      label={`Max File Size: ${
        maxFileSizeInBytes / 1048576
      } MB | Accepted File Types: JPG, PNG`}
    />
  );
}

ImagePicker.defaultProps = {
  withPreview: false,
  withIcon: false,
  maxFileSizeInBytes: 5242880,
};

ImagePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  withPreview: PropTypes.bool,
  withIcon: PropTypes.bool,
  maxFileSizeInBytes: PropTypes.number,
};
