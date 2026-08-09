// gml_Object_object37_Alarm_4  locals=2 args=0 len=172
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x213C448
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x213C428
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 80
0000005C: conv.i.v
00000060: call action_set_alarm(argc=2)
00000068: popz
0000006C: b 0x213C444
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 109
0000007C: conv.i.v
00000080: call action_set_alarm(argc=2)
00000088: popz
0000008C: b 0x213C464
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 74
0000009C: conv.i.v
000000A0: call action_set_alarm(argc=2)
000000A8: popz