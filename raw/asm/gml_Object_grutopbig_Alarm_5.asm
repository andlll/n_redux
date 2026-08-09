// gml_Object_grutopbig_Alarm_5  locals=2 args=0 len=136
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x216B064
00000028: push.imm.e -1
0000002C: conv.i.v
00000030: push.imm.e 34
00000034: conv.i.v
00000038: push.imm.e 279
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz
0000004C: push.imm.e 6
00000050: conv.i.v
00000054: push.imm.e 35
00000058: conv.i.v
0000005C: call action_set_alarm(argc=2)
00000064: popz
00000068: b 0x216B080
0000006C: push.imm.e 5
00000070: conv.i.v
00000074: push.imm.e 37
00000078: conv.i.v
0000007C: call action_set_alarm(argc=2)
00000084: popz