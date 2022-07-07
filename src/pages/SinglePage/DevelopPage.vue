<template>

  <q-layout>
    <q-page>
      <q-card class="shadow-0">
        <q-tabs
          v-model="tab"
          align="justify"
          class="bg-blue-grey-2"
          dense
          indicator-color="blue"
          inline-label
          mobile-arrows
          narrow-indicator
          outside-arrows
        >
          <q-tab label="Basic" name="basic"/>
          <q-tab label="Config" name="config"/>
          <q-tab label="Ssl" name="ssl"/>
          <!--          <q-tab  label="application" name="application"/>-->
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="q-gutter-md" name="basic">

            <div>
              <div class="text-body1 text-capitalize"> name</div>
              <div class="q-gutter-sm">
                <q-input v-model="data.website.name" color="dark" dense label="name"></q-input>
                <q-input v-model="data.website.web_server_type_text" color="dark" dense label="web server"
                         readonly></q-input>
              </div>
            </div>

            <div>
              <div class="text-body1 text-capitalize"> domain settings</div>
              <div class="q-gutter-md">
                <q-input v-model="data.website.domain" color="dark" dense label="domain"></q-input>
                <q-input v-model="data.website.extra_domain"
                         color="dark"
                         dense
                         hint="If you modify this, re-enable the SSL configuration to apply for the certificate."
                         label="extra domain"
                         outlined type="textarea"></q-input>
              </div>
            </div>

            <div>
              <div class="text-body1 text-capitalize"> path</div>
              <div class="q-gutter-sm">
                <q-input v-model="data.website.index_root" color="dark" dense label="folder" readonly>
                  <template v-slot:append>
                    <q-icon name="o_open_in_new"></q-icon>
                  </template>
                </q-input>

              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel class="shadow-0" name="config">
            <web-server-config :pk="data.website.id" :data="data.website.valid_web_server_config"></web-server-config>
          </q-tab-panel>
          <q-tab-panel name="ssl">
            <div v-if="data.website.ssl_enable">
              <div class="q-gutter-sm">
                <q-banner class="bg-blue-grey-1 text-center" dense rounded><span
                  class="text-body1 text-dark text-capitalize">issuer</span>
                </q-banner>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    common name
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.issuer_common_name
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize " style="min-width: 180px">
                    country name
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.issuer_country_name
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    organization name
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.issuer_organization_name
                    }}
                  </div>
                </div>
                <q-banner class="bg-blue-grey-1 text-center" dense rounded><span
                  class="text-body1 text-dark text-capitalize">issued</span>
                </q-banner>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    common name
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.issued_common_name
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize " style="min-width: 180px">
                    subject alt name
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.subject_alt_name
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    signature algorithm
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.signature_algorithm
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    serial number hex
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.certificate.serial_number_hex
                    }}
                  </div>
                </div>

                <q-banner class="bg-blue-grey-1 text-center" dense rounded><span
                  class="text-body1 text-dark text-capitalize">date</span>
                </q-banner>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    not before
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      date.formatDate(data.certificate.not_before, 'YYYY-MM-DD HH:mm:ss (Z)')
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    not after
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      date.formatDate(data.certificate.not_after, 'YYYY-MM-DD HH:mm:ss (Z)')
                    }}
                  </div>
                </div>
                <div class="flex  no-wrap rounded-borders items-baseline">
                  <div class="q-pa-sm bg-blue-grey-1 text-dark text-body1 text-capitalize" style="min-width: 180px">
                    expiration notice
                  </div>
                  <div class="q-pa-sm q-pl-lg bg-grey-1 text-center" style="min-width: 120px"> {{
                      data.website.ssl_config.certbot.email
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-center">
              <h4> SSL has not been enabled.</h4>
            </div>
          </q-tab-panel>
          <q-tab-panel name="application">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>


      </q-card>
    </q-page>
  </q-layout>

</template>

<script>
import {onMounted, ref} from "vue";
import WebServerConfig from "components/website/WebServerConfig";
import {getWebsite, getWebsiteCertificate} from "src/api/website";
import {errorLoading, hideLoading, showLoading} from "src/utils/loading";
import {date, useQuasar} from "quasar";

let _data = {
  "id": 23,
  "ssl_config": {
    "certbot": {
      "email": "a@a.com",
      "provider": "default"
    },
    "path": {
      "certificate": "/etc/letsencrypt/live/test5.jcpumiao.com/fullchain.pem",
      "key": "/etc/letsencrypt/live/test5.jcpumiao.com/privkey.pem"
    },
    "method": "http-01"
  },
  "database_id": null,
  "database_name": null,
  "create_at": "2022-06-21T16:41:17.823060+08:00",
  "update_at": "2022-06-28T18:29:44.152094+08:00",
  "name": "test5",
  "domain": "test5.jcpumiao.com",
  "extra_domain": null,
  "ssl_enable": true,
  "index_root": "/var/www/test5.jcpumiao.com",
  "status": 1,
  "status_info": null,
  "web_server_type": 1,
  "application": "NginxApplication",
  "application_config": {
    "name": "New website!",
    "text": "与君初相识，犹如故人归。嗨，别来无恙！ <br> Hello World！",
    "email": null
  },
  "valid_web_server_config": "server {\n       listen 80;\n       listen [::]:80;\n\n       server_name test5.jcpumiao.com;\n\n       ########SSL########\n       listen 443 ssl http2;\n       listen [::]:443 ssl http2;\n       ssl_certificate         /etc/letsencrypt/live/test5.jcpumiao.com/fullchain.pem;\n       ssl_certificate_key     /etc/letsencrypt/live/test5.jcpumiao.com/privkey.pem;\n       ssl_trusted_certificate /etc/letsencrypt/live/test5.jcpumiao.com/chain.pem;\n\n       ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;\n       ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;\n       ssl_prefer_server_ciphers on;\n       ssl_session_cache shared:SSL:10m;\n       ssl_session_timeout 10m;\n       error_page 497  https://$host$request_uri;\n       ########SSL########\n\n       root /var/www/test5.jcpumiao.com;\n       index index.html;\n\n       location / {\n               try_files $uri $uri/ =404;\n       }\n}",
  "user": 6
}
let _cert = {
  "issued_common_name": "test5.jcpumiao.com",
  "issuer_common_name": "R3",
  "issuer_country_name": "US",
  "issuer_organization_name": "Let's Encrypt",
  "subject_alt_name": "DNS:test5.jcpumiao.com",
  "not_before": "2022-06-21T07:41:20",
  "not_after": "2022-09-19T07:41:19",
  "signature_algorithm": "sha256WithRSAEncryption",
  "serial_number_hex": "3C:7C:32:A9:55:76:C1:8C:F2:47:20:3D:A6:58:80:9A:EE"
}
export default {
  name: "WebsiteSettingsDev",
  components: {WebServerConfig},
  setup() {
    const $q = useQuasar()
    const data = ref({
      website: _data,
      certificate: _cert,
    })

    onMounted(() => {
      console.log(_data)
      requestWebsite()
    })

    function requestWebsite() {
      showLoading($q)
      getWebsite(23).then(async res => {
        data.value.website = res
        res = await getWebsiteCertificate(23)
        data.value.certificate = res
        console.log(res)
      }).catch(err => {
        errorLoading($q, err)
      }).finally(() => {
        hideLoading($q)
      })
    }

    return {
      tab: ref('ssl'), data, date
    }
  }
}
</script>

<style scoped>


</style>
