export function parseObject(
    object: Record<string, unknown> | unknown[] | null | undefined
  ): any {
    return object
      ? JSON.parse(
          JSON.stringify(object, (_key, value) => {
            return typeof value === 'bigint' ? value.toString() : value
          })
        )
      : null
  }

  export function customStringifyObject(
    object: Record<string, unknown> | unknown[] | null
  ): string {
    return JSON.stringify(object, (_key, value) => {
      return typeof value === 'bigint' ? value.toString() : value
    })
  }
