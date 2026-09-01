const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=UTF-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
const clean=(value,max=500)=>String(value||'').trim().replace(/[\u0000-\u001f\u007f]/g,' ').slice(0,max);
const emailOk=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export async function onRequestPost({request,env}){
 try{
  const type=request.headers.get('content-type')||'';const form=type.includes('application/json')?await request.json():Object.fromEntries(await request.formData());
  if(clean(form.website,20))return json({ok:true,message:'Solicitação recebida.'});
  const startedAt=Number(form.startedAt);if(!Number.isFinite(startedAt)||Date.now()-startedAt<1800)return json({ok:false,message:'Aguarde alguns segundos e tente novamente.'},400);
  const kind=clean(form.kind,40),name=clean(form.name,120),email=clean(form.email,180),phone=clean(form.phone,60),origin=clean(form.origin,100);
  if(!['data-room-access','contact'].includes(kind)||name.length<2||!emailOk(email)||phone.length<8)return json({ok:false,message:'Revise nome, e-mail e telefone antes de enviar.'},422);
  const lead={kind,name,email,phone,origin,company:clean(form.company,180),profile:clean(form.profile,120),interest:clean(form.interest,1500),subject:clean(form.subject,160),message:clean(form.message,1500),consent:form.consent==='on'||form.consent===true,receivedAt:new Date().toISOString(),source:'ametista-site'};
  if(kind==='data-room-access'&&!lead.consent)return json({ok:false,message:'É necessário aceitar o contato e a confidencialidade.'},422);
  if(!env.LEAD_WEBHOOK_URL)return json({ok:false,message:'O canal de atendimento ainda não foi configurado. Tente novamente em breve.'},503);
  const headers={'content-type':'application/json'};if(env.LEAD_WEBHOOK_TOKEN)headers.authorization=`Bearer ${env.LEAD_WEBHOOK_TOKEN}`;
  const delivery=await fetch(env.LEAD_WEBHOOK_URL,{method:'POST',headers,body:JSON.stringify(lead)});if(!delivery.ok)throw new Error(`Webhook respondeu ${delivery.status}`);
  return json({ok:true,message:kind==='contact'?'Mensagem enviada. A equipe entrará em contato.':'Solicitação enviada. A equipe avaliará o acesso e entrará em contato.'});
 }catch(error){console.error('lead_delivery_error',error);return json({ok:false,message:'Não foi possível enviar agora. Tente novamente mais tarde.'},502)}
}
export function onRequest(){return json({ok:false,message:'Método não permitido.'},405)}