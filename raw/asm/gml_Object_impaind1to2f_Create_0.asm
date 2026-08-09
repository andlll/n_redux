// gml_Object_impaind1to2f_Create_0  locals=2 args=0 len=600
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2167254
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2167254
00000040: b 0x216725C
00000044: popenv 0x4167218
00000048: b 0x2167260
0000004C: popenv 0x1D6725C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2167290
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x21672D4
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x21672D4
000000C0: b 0x21672DC
000000C4: popenv 0x4167298
000000C8: b 0x21672E0
000000CC: popenv 0x1D672DC
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2167310
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.imm.e 3
00000110: sub.i.v
00000114: pop.v.v depth
0000011C: push.imm.e 0
00000120: pop.v.i tic
00000128: push.imm.e 2
0000012C: conv.i.v
00000130: call action_if_dice(argc=1)
00000138: pop.v.v local.__b__
00000140: push.local.v local.__b__
00000148: conv.v.b
0000014C: bf 0x21673D8
00000150: push.imm.e 2
00000154: conv.i.v
00000158: call action_if_dice(argc=1)
00000160: pop.v.v local.__b__
00000168: push.local.v local.__b__
00000170: conv.v.b
00000174: bf 0x21673B0
00000178: push.imm.e 1
0000017C: conv.i.v
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e 295
0000018C: conv.i.v
00000190: call action_sprite_set(argc=3)
00000198: popz
0000019C: b 0x21673D4
000001A0: push.imm.e 1
000001A4: conv.i.v
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: push.imm.e 296
000001B4: conv.i.v
000001B8: call action_sprite_set(argc=3)
000001C0: popz
000001C4: b 0x216744C
000001C8: push.imm.e 2
000001CC: conv.i.v
000001D0: call action_if_dice(argc=1)
000001D8: pop.v.v local.__b__
000001E0: push.local.v local.__b__
000001E8: conv.v.b
000001EC: bf 0x2167428
000001F0: push.imm.e 1
000001F4: conv.i.v
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 297
00000204: conv.i.v
00000208: call action_sprite_set(argc=3)
00000210: popz
00000214: b 0x216744C
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.imm.e 298
0000022C: conv.i.v
00000230: call action_sprite_set(argc=3)
00000238: popz
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 45
00000248: conv.i.v
0000024C: call action_set_alarm(argc=2)
00000254: popz