import { API_BASE_URL } from '../config'

/**
 * Initiates a security scan for a public or accessible GitHub repository.
 * @param {string} repositoryUrl - The full GitHub repository URL.
 * @returns {Promise<{scan_id: string, status: string}>}
 */
export async function startGitHubScan(repositoryUrl) {
  const response = await fetch(`${API_BASE_URL}/scans/github`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      repository_url: repositoryUrl.trim(),
      repo_url: repositoryUrl.trim(),
    }),
  })

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`
    try {
      const errData = await response.json()
      if (errData.error) errorMsg = errData.error
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg)
  }

  return response.json()
}

/**
 * Initiates a security scan by uploading a local repository ZIP archive.
 * @param {File} zipFile - The raw ZIP archive file.
 * @returns {Promise<{scan_id: string, status: string}>}
 */
export async function startZipScan(zipFile) {
  const response = await fetch(`${API_BASE_URL}/scans/zip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/zip',
    },
    body: zipFile,
  })

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`
    try {
      const errData = await response.json()
      if (errData.error) errorMsg = errData.error
    } catch {
      // ignore
    }
    throw new Error(errorMsg)
  }

  return response.json()
}

/**
 * Polls the current state, progress, and stage of an active scan.
 * @param {string} scanId - The unique scan ID returned by the backend.
 * @returns {Promise<{scan_id: string, status: string, progress: number, current_stage: string, score: number|null, risk_level: string|null, error: string|null}>}
 */
export async function getScanStatus(scanId) {
  const response = await fetch(`${API_BASE_URL}/scans/${scanId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch scan status (${response.status})`)
  }

  return response.json()
}

/**
 * Fetches the authoritative full scan results once status is COMPLETED.
 * @param {string} scanId - The unique scan ID.
 * @returns {Promise<any>} Full security report object from backend.
 */
export async function getScanResults(scanId) {
  const response = await fetch(`${API_BASE_URL}/scans/${scanId}/results`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch scan results (${response.status})`)
  }

  return response.json()
}

export { API_BASE_URL }
