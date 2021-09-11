module.exports = {
    answers: [`#include<iostream>

using namespace std;

int main() {
    int n;
    cin >> n;

    float pl = 0, mn = 0, zr = 0;

    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        zr += (val == 0);
        pl += (val > 0);
        mn += (val < 0);
    }
    
    zr = zr / (double)n;
    pl = pl / (double)n;
    mn = mn / (double)n;
    
    printf("%0.06lf\n%0.06lf\n%0.06lf\n", pl, mn, zr);
    return 0;
}`,`#include<iostream>

using namespace std;

int main () {
    int height;
    cin >> height;

    for (int i = 1; i <= height; i++) {
        for (int j = 0; j < i; j++) {
            if(j==0) {		
                //Printing spaces 
                for(int t = 0; t < height - i; t++) cout << " ";
            }
            //Print hashes
            cout << "#";
        }
        cout << endl;
    }
    return 0;
}`,`#include <bits/stdc++.h>
typedef long long LL;
using namespace std;

int main(){
	LL s[5];
	LL d = 0;
	for(int i = 0; i < 5; i++){
		cin >> s[i];
		d += s[i];
	}
	sort(s,s+5);
	cout << d-s[4] << " " << d-s[0] << endl;
`,`#include <iostream>

int main(){
    int c, n, max = 0;
    std::cin.ignore();
    while(std::cin >> n)
        max < n ? c = !!(max = n) : c += max == n;
    std::cout << c;
    return 0;
}`,`#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <sstream>
#include <iomanip>
using namespace std;

int main(){
    int h, m, s;
    char ch, aorp;
    
    cin >> h >> ch >> m >> ch >> s >> aorp >> ch;
    h = (aorp == 'A') ? (h==12 ? 0 : h) : (h==12 ? 12 : h+12);
        
    cout << setw(2) << setfill('0') << h << ":" 
         << setw(2) << setfill('0') << m << ":" 
         << setw(2) << setfill('0') << s << endl;
    
    return 0;
}`
    ]
}