// gml_Object_grutopbig_Alarm_0  locals=2 args=0 len=424
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x216B320
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x216B25C
00000050: push.imm.e 2
00000054: conv.i.v
00000058: call action_if_dice(argc=1)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x216B234
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 273
0000008C: conv.i.v
00000090: call action_sprite_set(argc=3)
00000098: popz
0000009C: b 0x216B258
000000A0: push.imm.e 1
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 274
000000B4: conv.i.v
000000B8: call action_sprite_set(argc=3)
000000C0: popz
000000C4: b 0x216B320
000000C8: push.imm.e 2
000000CC: conv.i.v
000000D0: call action_if_dice(argc=1)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x216B2FC
000000F0: push.imm.e 2
000000F4: conv.i.v
000000F8: call action_if_dice(argc=1)
00000100: pop.v.v local.__b__
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x216B2D4
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.imm.e 275
0000012C: conv.i.v
00000130: call action_sprite_set(argc=3)
00000138: popz
0000013C: b 0x216B2F8
00000140: push.imm.e 1
00000144: conv.i.v
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 276
00000154: conv.i.v
00000158: call action_sprite_set(argc=3)
00000160: popz
00000164: b 0x216B320
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: push.imm.e 0
00000174: conv.i.v
00000178: push.imm.e 272
0000017C: conv.i.v
00000180: call action_sprite_set(argc=3)
00000188: popz
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.imm.e 70
00000198: conv.i.v
0000019C: call action_set_alarm(argc=2)
000001A4: popz