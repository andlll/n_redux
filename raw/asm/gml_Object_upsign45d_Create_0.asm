// gml_Object_upsign45d_Create_0  locals=2 args=0 len=92
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: pop.v.i phase
0000000C: push.imm.e 0
00000010: pop.v.i arm
00000018: push.imm.e 2
0000001C: conv.i.v
00000020: push.imm.e 0
00000024: conv.i.v
00000028: push.imm.e 736
0000002C: conv.i.v
00000030: call action_if_number(argc=3)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x20F9840
00000050: call action_kill_object(argc=0)
00000058: popz