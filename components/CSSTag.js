const dev = process.env.NODE_ENV !== 'production'

export default ({ style }) => (
  dev && <style dangerouslySetInnerHTML={{ __html: style }} />
)
