// gml_Object_grutop_Alarm_0  locals=2 args=0 len=224
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x216A1F0
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x216A1C8
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1070
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: b 0x216A1EC
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 1071
0000008C: conv.i.v
00000090: call action_sprite_set(argc=3)
00000098: popz
0000009C: b 0x216A214
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 1069
000000B4: conv.i.v
000000B8: call action_sprite_set(argc=3)
000000C0: popz
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 36
000000D0: conv.i.v
000000D4: call action_set_alarm(argc=2)
000000DC: popz