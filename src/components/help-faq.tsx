import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpFaq() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aide & FAQ</CardTitle>
        <CardDescription>Tout ce que vous devez savoir sur l'utilisation de GlobalConverter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Comment utiliser le convertisseur</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Entrez le montant que vous souhaitez convertir dans le champ "Montant"</li>
              <li>Sélectionnez la devise source dans le menu déroulant "Devise source"</li>
              <li>Ajoutez une ou plusieurs devises cibles en utilisant le menu "Ajouter une devise"</li>
              <li>Les résultats de conversion s'afficheront automatiquement</li>
            </ol>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>D'où proviennent les taux de change ?</AccordionTrigger>
              <AccordionContent>
                Les taux de change sont fournis par l'API ExchangeRate, qui offre des données en temps réel pour les
                devises traditionnelles et les cryptomonnaies. Les taux sont mis à jour régulièrement pour garantir la
                précision des conversions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Puis-je convertir vers plusieurs devises en même temps ?</AccordionTrigger>
              <AccordionContent>
                Oui, vous pouvez ajouter jusqu'à 10 devises cibles simultanément. Il suffit d'utiliser le menu "Ajouter
                une devise" pour sélectionner les devises que vous souhaitez inclure dans votre conversion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Mes préférences sont-elles sauvegardées ?</AccordionTrigger>
              <AccordionContent>
                Oui, l'application sauvegarde automatiquement vos préférences (devise source, devises cibles, montant et
                onglet actif) dans le stockage local de votre navigateur. Vos paramètres seront donc conservés même si
                vous fermez l'application.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Comment fonctionne le mode sombre/clair ?</AccordionTrigger>
              <AccordionContent>
                Vous pouvez basculer entre le mode sombre et le mode clair en cliquant sur l'icône de soleil/lune dans
                le coin supérieur droit de l'application. Vous pouvez également choisir de suivre les préférences de
                votre système.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Les conversions sont-elles précises ?</AccordionTrigger>
              <AccordionContent>
                Les conversions sont basées sur les taux de change en temps réel fournis par l'API ExchangeRate. Bien
                que ces taux soient généralement précis, ils peuvent légèrement différer des taux utilisés par les
                banques ou les services de change, qui appliquent souvent des frais supplémentaires.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>L'application fonctionne-t-elle hors ligne ?</AccordionTrigger>
              <AccordionContent>
                Non, l'application nécessite une connexion Internet pour récupérer les taux de change les plus récents.
                Sans connexion, vous pourrez toujours accéder à l'interface, mais les conversions ne seront pas mises à
                jour.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Quelles cryptomonnaies sont supportées ?</AccordionTrigger>
              <AccordionContent>
                L'application prend en charge plusieurs cryptomonnaies populaires, notamment Bitcoin (BTC), Ethereum
                (ETH), Ripple (XRP), Litecoin (LTC), Bitcoin Cash (BCH), Binance Coin (BNB), Tether (USDT), Polkadot
                (DOT) et Cardano (ADA).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
