import { useEditor } from '@craftjs/core'

export const useCurrentCraftComponent = () => {
  return useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last()
    let selected

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      }
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    }
  })
}
