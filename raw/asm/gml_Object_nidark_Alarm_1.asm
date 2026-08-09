// gml_Object_nidark_Alarm_1  locals=2 args=0 len=116
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x213B4E4
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 671
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz
0000004C: b 0x213B508
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 673
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz