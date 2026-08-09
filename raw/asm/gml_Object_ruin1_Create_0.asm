// gml_Object_ruin1_Create_0  locals=2 args=0 len=552
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: pop.v.v depth
00000014: push.imm.e 455
00000018: pushenv 0x21369C8
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21369C8
00000054: b 0x21369D0
00000058: popenv 0x413698C
0000005C: b 0x21369D4
00000060: popenv 0x1D369D0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2136A04
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x2136A48
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x2136A48
000000D4: b 0x2136A50
000000D8: popenv 0x4136A0C
000000DC: b 0x2136A54
000000E0: popenv 0x1D36A50
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x2136A84
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.imm.e 2
00000118: conv.i.v
0000011C: call action_if_dice(argc=1)
00000124: pop.v.v local.__b__
0000012C: push.local.v local.__b__
00000134: conv.v.b
00000138: bf 0x2136B24
0000013C: push.imm.e 2
00000140: conv.i.v
00000144: call action_if_dice(argc=1)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x2136AFC
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: push.imm.e 350
00000178: conv.i.v
0000017C: call action_sprite_set(argc=3)
00000184: popz
00000188: b 0x2136B20
0000018C: push.imm.e 1
00000190: conv.i.v
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.imm.e 351
000001A0: conv.i.v
000001A4: call action_sprite_set(argc=3)
000001AC: popz
000001B0: b 0x2136B98
000001B4: push.imm.e 2
000001B8: conv.i.v
000001BC: call action_if_dice(argc=1)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x2136B74
000001DC: push.imm.e 1
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 352
000001F0: conv.i.v
000001F4: call action_sprite_set(argc=3)
000001FC: popz
00000200: b 0x2136B98
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: push.imm.e 0
00000210: conv.i.v
00000214: push.imm.e 353
00000218: conv.i.v
0000021C: call action_sprite_set(argc=3)
00000224: popz