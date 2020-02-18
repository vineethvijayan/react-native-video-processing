require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = 'RNVideoProcessing'
  s.version          = package['version']
  s.summary          = package['description']
  s.license          = package['license']
  s.homepage         = package['homepage']
  s.authors          = package['author']
  s.source           = { :git => 'https://github.com/shahen94/react-native-video-processing.git', :tag => s.version }
  s.source_files     = 'ios/**/*.{h,m,swift}'
  s.requires_arc = true
  s.platforms        = { :ios => "9.0"}
  s.dependency       'React'
end
